document.addEventListener('DOMContentLoaded', function() {
    // Create favicon links
    const appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.sizes = '180x180';
    appleIcon.href = 'images/favicon_io/apple-touch-icon.png';
    document.head.appendChild(appleIcon);
    
    const icon32 = document.createElement('link');
    icon32.rel = 'icon';
    icon32.type = 'image/png';
    icon32.sizes = '32x32';
    icon32.href = 'images/favicon_io/favicon-32x32.png';
    document.head.appendChild(icon32);
    
    const icon16 = document.createElement('link');
    icon16.rel = 'icon';
    icon16.type = 'image/png';
    icon16.sizes = '16x16';
    icon16.href = 'images/favicon_io/favicon-16x16.png';
    document.head.appendChild(icon16);
    
    const manifest = document.createElement('link');
    manifest.rel = 'manifest';
    manifest.href = 'images/favicon_io/site.webmanifest';
    document.head.appendChild(manifest);
});