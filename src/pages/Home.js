import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaDownload } from "react-icons/fa"; // Added FaDownload icon
import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiGit,
  SiPostman,
} from "react-icons/si";
import ProjectCard from "../components/ProjectCard";

function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
        console.log(projects);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [projects]);

  const skills = [
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
    { name: "React.js", icon: <SiReact className="text-cyan-400" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
    { name: "Express", icon: <SiExpress className="text-gray-200" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400" /> },
    { name: "Git", icon: <SiGit className="text-orange-500" /> },
    { name: "RESTful APIs", icon: <SiPostman className="text-orange-400" /> },
  ];

  return (
    <div className="text-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-shadow-md">
              Hi, I'm <span className="text-[#8a2be2]">Fuzail Vhora</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Full Stack Developer | JavaScript Enthusiast
            </p>
            <div className="flex flex-wrap justify-center space-x-4 space-y-4 md:space-y-0">
              <Link
                to="/projects"
                className="px-8 py-4 bg-gradient-to-r from-[#8a2be2] to-[#4e0b8b] text-white font-semibold rounded-xl shadow-lg hover:bg-[#8a2be2] transition-all transform hover:scale-105"
              >
                View My Work
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl shadow-lg hover:bg-white hover:text-black transition-all transform hover:scale-105"
              >
                Contact Me
              </Link>
              {/* Download Resume Button */}
              <a
                href="/MyResume.pdf" // Make sure the file is in the public folder
                download
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl shadow-lg hover:bg-white hover:text-black transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <FaDownload className="inline" />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Featured Projects
            </h2>
            {/* <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 transform">
                <h3 className="text-xl font-semibold mb-2 text-gray-300">Project Title</h3>
                <p className="text-gray-400 text-sm">
                  Short project description here.
                </p>
              </div> */}
            {/* {(projects && projects.length > 0)  && {
                projects.map(projects=> (
                  <></>
                ))
              }} */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/projects"
                className="inline-flex items-center space-x-2 text-[#8a2be2] hover:text-purple-400 transition-all"
              >
                <span>View All Projects</span>
                <FaArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Technical Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="bg-gray-800 rounded-xl p-6 text-center border border-gray-800 hover:scale-110 transition-transform duration-300 flex flex-col items-center space-y-3 shadow-lg hover:shadow-2xl"
                >
                  <div className="text-6xl mb-2 transform transition-all hover:rotate-12 hover:scale-125">
                    {skill.icon}
                  </div>
                  <p className="font-medium text-white">{skill.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
