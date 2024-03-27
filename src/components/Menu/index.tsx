'use client'
import { useState } from 'react';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <a href="/">
            Minha Lista
          </a>
        </div>
        <div className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              <a href="/about">
                Sobre
              </a>
            </li>
            <li>
              <a href="/services">
                Tarefas
              </a>
            </li>
            <li>
              <a href="/contact">
                Contato
              </a>
            </li>
          </ul>
        </div>
        <div className="block md:hidden">
          <button className="text-white focus:outline-none" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2">
          <ul className="flex flex-col space-y-2">
            <li>
              <a href="/about">
                Sobre
              </a>
            </li>
            <li>
              <a href="/services">
                Sobre
              </a>
            </li>
            <li>
              <a href="/contact">
                Contato
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Menu;
