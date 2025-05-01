import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function About() {
  const skills = {
    "Frontend Development": [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "React.js",
      "Tailwind CSS",
      "Responsive Design",
    ],
    "Backend Development": [
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "MongoDB",
      "Authentication",
      "API Security",
    ],
    "Development Tools": [
      "Git",
      "npm",
      "Webpack",
      "VS Code",
      "Chrome DevTools",
      "Postman",
    ],
    "Soft Skills": [
      "Problem Solving",
      "Team Collaboration",
      "Communication",
      "Time Management",
      "Adaptability",
      "Attention to Detail",
    ],
  };

  return (
    <div className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* About Me Section */}
          <section className="mb-16">
            <h1 className="text-4xl font-bold text-center mb-12 text-gray-500">
              About Me
            </h1>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className=" shadow-xl   rounded-full  flex items-center justify-center">
                <img
                  src="https://media.licdn.com/dms/image/v2/D5603AQFUC-K6I7xoIw/profile-displayphoto-shrink_800_800/B56ZP3brddGsAc-/0/1735023050627?e=1751500800&v=beta&t=orCuwZL6amkcshF37-m7GRGH74V14DyLfbke_k5APUI"
                  alt="Your Name"
                  className="rounded-full w-[300px] h-[300px] shadow-lg hover:scale-110 transition-all"
                />

                <div></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-500">
                  Hi, I'm Fuzail Vhora👋
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  I'm a passionate Full Stack Developer with a focus on
                  JavaScript technologies. I love building web applications that
                  are not only functional but also provide great user
                  experiences.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  While I'm new to professional development, I've dedicated
                  countless hours to learning and building projects. I'm
                  constantly exploring new technologies and best practices to
                  improve my skills.
                </p>
                <Link to="/contact" className="btn btn-primary inline-block">
                  Get in Touch
                </Link>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-300 text-center mb-12">
              Technical Skills
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(skills).map(([category, items]) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="card bg-gray-800 text-gray-300 hover:scale-125"
                >
                  <h3 className="text-xl font-bold mb-4">{category}</h3>
                  <ul className="space-y-2">
                    {items.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center text-gray-500 dark:text-gray-300"
                      >
                        <svg
                          className="h-4 w-4 text-primary mr-2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
