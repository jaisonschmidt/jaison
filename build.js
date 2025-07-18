const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const fm = require('front-matter');
const slugify = require('slugify');
const { execSync } = require('child_process');

// Configuration
const POSTS_DIR = 'posts';
const PUBLIC_DIR = 'public';
const TEMPLATES_DIR = 'templates';
const POSTS_OUTPUT_DIR = path.join(PUBLIC_DIR, 'posts');

// Blog configuration
const BLOG_CONFIG = {
    postsPerPage: 2, // Set to 2 for testing, can be easily changed to up to 10
    maxPostsPerPage: 10
};

// Ensure output directories exist
if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}
if (!fs.existsSync(POSTS_OUTPUT_DIR)) {
    fs.mkdirSync(POSTS_OUTPUT_DIR, { recursive: true });
}

// Simple template engine
function renderTemplate(templatePath, data) {
    let template = fs.readFileSync(templatePath, 'utf8');
    
    // Handle mustache-style loops
    template = template.replace(/\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (match, key, content) => {
        if (data[key] && Array.isArray(data[key])) {
            return data[key].map(item => {
                let itemContent = content;
                Object.keys(item).forEach(itemKey => {
                    itemContent = itemContent.replace(new RegExp(`\\{\\{${itemKey}\\}\\}`, 'g'), item[itemKey] || '');
                });
                return itemContent;
            }).join('');
        }
        return '';
    });
    
    // Handle negative conditionals
    template = template.replace(/\{\{\^(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (match, key, content) => {
        if (!data[key] || (Array.isArray(data[key]) && data[key].length === 0)) {
            return content;
        }
        return '';
    });
    
    // Handle conditionals
    template = template.replace(/\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (match, key, content) => {
        if (data[key] && !Array.isArray(data[key])) {
            Object.keys(data[key]).forEach(itemKey => {
                content = content.replace(new RegExp(`\\{\\{${itemKey}\\}\\}`, 'g'), data[key][itemKey] || '');
            });
            return content;
        }
        return '';
    });
    
    // Replace simple variables
    Object.keys(data).forEach(key => {
        if (typeof data[key] === 'string' || typeof data[key] === 'number') {
            template = template.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), data[key]);
        }
    });
    
    return template;
}

// Process a single markdown post
function processPost(filename) {
    const filePath = path.join(POSTS_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { attributes, body } = fm(fileContent);
    
    // Generate slug from filename or title
    const slug = attributes.slug || slugify(path.basename(filename, '.md'), { lower: true, strict: true });
    
    // Parse date
    const date = new Date(attributes.date || fs.statSync(filePath).birthtime);
    const formattedDate = date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Convert markdown to HTML
    const content = marked(body);
    
    // Generate excerpt from first paragraph or description
    const excerpt = attributes.excerpt || 
                   attributes.description || 
                   body.split('\n\n')[0].substring(0, 200) + '...';
    
    const post = {
        title: attributes.title || path.basename(filename, '.md'),
        content,
        excerpt,
        author: attributes.author,
        date,
        isoDate: date.toISOString(),
        formattedDate,
        slug,
        filename
    };
    
    return post;
}

// Read and process all posts
function getAllPosts() {
    if (!fs.existsSync(POSTS_DIR)) {
        console.log('Posts directory not found, creating it...');
        fs.mkdirSync(POSTS_DIR, { recursive: true });
        return [];
    }
    
    const files = fs.readdirSync(POSTS_DIR)
        .filter(file => file.endsWith('.md'));
    
    return files.map(processPost)
        .sort((a, b) => b.date - a.date); // Sort by date, newest first
}

// Generate individual post pages
function generatePostPages(posts) {
    const postTemplate = path.join(TEMPLATES_DIR, 'post.html');
    const layoutTemplate = path.join(TEMPLATES_DIR, 'layout.html');
    
    posts.forEach(post => {
        const postContent = renderTemplate(postTemplate, post);
        const finalHtml = renderTemplate(layoutTemplate, {
            title: post.title,
            description: post.excerpt,
            content: postContent
        });
        
        const outputPath = path.join(POSTS_OUTPUT_DIR, `${post.slug}.html`);
        fs.writeFileSync(outputPath, finalHtml);
        console.log(`Generated: ${outputPath}`);
    });
}

// Generate about page
function generateAboutPage() {
    const aboutTemplate = path.join(TEMPLATES_DIR, 'about.html');
    const layoutTemplate = path.join(TEMPLATES_DIR, 'layout.html');
    
    const aboutContent = renderTemplate(aboutTemplate, {});
    const finalHtml = renderTemplate(layoutTemplate, {
        title: 'Sobre',
        description: 'Conheça mais sobre Jaison Schmidt, desenvolvedor e criador do blog',
        content: aboutContent
    });
    
    const outputPath = path.join(PUBLIC_DIR, 'sobre.html');
    fs.writeFileSync(outputPath, finalHtml);
    console.log(`Generated: ${outputPath}`);
}
function generateHomePage(posts) {
    const homeTemplate = path.join(TEMPLATES_DIR, 'home.html');
    const layoutTemplate = path.join(TEMPLATES_DIR, 'layout.html');
    
    const homeContent = renderTemplate(homeTemplate, { 
        posts,
        postsPerPage: BLOG_CONFIG.postsPerPage 
    });
    const finalHtml = renderTemplate(layoutTemplate, {
        title: 'Home',
        description: 'Jaison\'s Blog - Compartilhando ideias sobre tecnologia e desenvolvimento',
        content: homeContent
    });
    
    const outputPath = path.join(PUBLIC_DIR, 'index.html');
    fs.writeFileSync(outputPath, finalHtml);
    console.log(`Generated: ${outputPath}`);
}

// Build CSS with Tailwind
function buildCSS() {
    try {
        console.log('Building CSS with Tailwind...');
        execSync(`npx tailwindcss -i ./src/styles.css -o ./public/styles.css --minify`, {
            stdio: 'inherit'
        });
        console.log('CSS built successfully');
    } catch (error) {
        console.error('Error building CSS:', error.message);
        process.exit(1);
    }
}

// Main build function
function build() {
    console.log('🔨 Building blog...');
    
    // Build CSS first
    buildCSS();
    
    // Process posts
    const posts = getAllPosts();
    console.log(`Found ${posts.length} posts`);
    
    // Generate pages
    generatePostPages(posts);
    generateHomePage(posts);
    generateAboutPage();
    
    console.log('✅ Build completed successfully!');
    console.log(`📁 Output directory: ${PUBLIC_DIR}`);
    
    if (posts.length > 0) {
        console.log('\n📝 Posts generated:');
        posts.forEach(post => {
            console.log(`  - ${post.title} (${post.formattedDate})`);
        });
    }
}

// Run build
if (require.main === module) {
    build();
}

module.exports = { build, getAllPosts, processPost };