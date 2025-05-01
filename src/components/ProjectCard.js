import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card overflow-hidden group bg-gray-800 shadow-lg rounded-lg transform hover:scale-102 transition-all duration-300 ease-in-out"
    >
      {/* Project Image */}
      <div className="relative overflow-hidden rounded-t-lg mb-4">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200 ease-in-out"
        />
      </div>

      {/* Project Info */}
      <div className="p-6 bg-gray-900 text-white">
        <h3 className="text-2xl font-semibold mb-3 tracking-tight">{project.title}</h3>
        <p className="text-lg text-gray-400 mb-4 line-clamp-3">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-4 py-1 text-sm bg-gray-700 text-gray-300 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex space-x-6">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-lg text-gray-300 hover:text-primary transition-colors duration-200"
            >
              <FaGithub className="h-6 w-6" />
              <span>Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-lg text-gray-300 hover:text-primary transition-colors duration-200"
            >
              <FaExternalLinkAlt className="h-5 w-5" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
