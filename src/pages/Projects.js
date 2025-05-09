import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';
import axiosInstance from "../Api/axios"

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedTech, setSelectedTech] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTechnologies = (projects) => {
    const techSet = new Set();
    projects.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    return ['All', ...Array.from(techSet)];
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get('/project');
       console.log("Response from server:", response);
        
       let data = response.data.projects;
        
        console.log("Fetched projects:", data);
        
        setProjects(data);
        setFilteredProjects(data);
      } catch (err) {
        setError(err.message);
        console.log("Error fetching projects:", err);
        
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedTech === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project =>
          project.technologies.includes(selectedTech)
        )
      );
    }
  }, [selectedTech, projects]);

  if (loading) {
    return (
      <div className="section min-h-screen flex items-center justify-center">
        <div className="text-xl font-medium text-gray-300">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section min-h-screen flex items-center justify-center">
        <div className="text-xl font-medium text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="section py-16  text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 tracking-tight">
            My Projects
          </h1>

          {/* Technology Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {getTechnologies(projects).map((tech) => {
              const isSelected = selectedTech === tech;
              return (
                <motion.button
                  key={tech}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border
                    ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                        : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white'
                    }`}
                >
                  {tech}
                </motion.button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>

          {/* No Projects Message */}
          {filteredProjects.length === 0 && (
            <div className="text-center text-gray-400 mt-12 text-lg">
              No projects found with the selected technology.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Projects;
