const Footer = () => {
    return (
      <footer className="w-full bg-muted py-10 text-muted-foreground border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Left Section */}
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-xl font-bold text-primary">Intervue<span className="text-blue-500">AI</span></h2>
            <p className="text-sm">Become Interview-ready with AI-powered feedback and mock interviews.</p>
            <p className="text-xs">&copy; {new Date().getFullYear()} IntervueAI. All rights reserved.</p>
          </div>
  
          {/* Center Links */}
          <div className="flex gap-8 text-sm">
            <div className="space-y-1">
              <h4 className="font-semibold text-foreground">Product</h4>
              <ul className="space-y-1">
                <li><a href="#" className="hover:underline">Features</a></li>
                <li><a href="#" className="hover:underline">Pricing</a></li>
                <li><a href="#" className="hover:underline">Roadmap</a></li>
              </ul>
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-foreground">Company</h4>
              <ul className="space-y-1">
                <li><a href="#" className="hover:underline">About</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
          </div>
  
          {/* Right Side */}
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" className="hover:text-primary">
              <i className="ri-github-fill text-2xl"></i>
            </a>
            <a href="https://twitter.com" target="_blank" className="hover:text-primary">
              <i className="ri-twitter-x-line text-2xl"></i>
            </a>
            <a href="mailto:support@intervueai.com" className="hover:text-primary">
              <i className="ri-mail-line text-2xl"></i>
            </a>
          </div>
  
        </div>
      </footer>
    )
  }
  
  export default Footer;
  