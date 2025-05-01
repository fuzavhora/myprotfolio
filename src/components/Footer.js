import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/fuzavhora',
      icon: FaGithub,
      color: 'text-gray-400', // Custom color for GitHub
      hoverColor: 'hover:text-gray-100', // Hover color for GitHub
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/fuzail-vhora-8188601a6/',
      icon: FaLinkedin,
      color: 'text-blue-600', // Custom color for LinkedIn
      hoverColor: 'hover:text-blue-800', // Hover color for LinkedIn
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/f.m.vhora',
      icon: FaInstagram,
      color: 'text-pink-500', // Custom color for Instagram
      hoverColor: 'hover:text-pink-700', // Hover color for Instagram
    },
  ];

  return (
    <footer className=" text-gray-300 backdrop-blur-sm border-t border-gray-800 shadow-xl mt-auto px-4 py-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-6">
        
        {/* Social Icons with Name */}
        <div className="flex flex-wrap justify-center items-center space-x-6 md:space-x-10">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="group flex items-center space-x-2 transition duration-300 transform hover:scale-110 mb-4 md:mb-0"
              >
                <Icon className={`${link.color} h-10 w-10 group-hover:${link.hoverColor} transition duration-300`} />
                <span className="text-lg md:text-xl text-gray-400 group-hover:text-white transition duration-300">
                  {link.name}
                </span>
              </a>
            );
          })}
        </div>

        {/* Footer Text */}
        <div className="text-center space-y-1 mt-6">
          <p className="text-sm md:text-base">
            Built with <span className="text-blue-400">React</span>, <span className="text-green-400">Node.js</span> &{' '}
            <span className="text-emerald-400">MongoDB</span>
          </p>
          <p className="text-sm md:text-base">
            © {currentYear}{' '}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-semibold">
              Your Name
            </span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
