import React from 'react';
import { Divider } from "@heroui/react";
import { Link } from 'react-router-dom';
import { Github, Linkedin, Heart, LayoutDashboard, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-slate-100 pt-10 pb-6 mt-auto">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary transition-colors">
                <LayoutDashboard className="text-primary group-hover:text-white" size={20} />
              </div>
              <p className="font-black text-xl tracking-tighter text-slate-800">FAHMY</p>
            </Link>
            <p className="text-slate-400 text-sm font-medium">
              Connecting people through thoughts.
            </p>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <p className="text-slate-800 font-bold text-sm uppercase tracking-wider">Platform</p>
              <Link to="/" className="text-slate-500 hover:text-primary text-sm transition-colors font-medium">Feed</Link>
              <Link to="/profile" className="text-slate-500 hover:text-primary text-sm transition-colors font-medium">Profile</Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-slate-800 font-bold text-sm uppercase tracking-wider">Account</p>
              <Link to="/login" className="text-slate-500 hover:text-primary text-sm transition-colors font-medium">Login</Link>
              <Link to="/register" className="text-slate-500 hover:text-primary text-sm transition-colors font-medium">Register</Link>
            </div>
          </div>

          <div className="flex gap-3">
            <a 
              href="https://github.com/moffahmii" 
              target="_blank" 
              rel="noreferrer"
              className="p-2.5 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
              title="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/moffahmii" 
              target="_blank" 
              rel="noreferrer"
              className="p-2.5 rounded-full bg-slate-50 text-slate-400 hover:bg-[#0077b5] hover:text-white transition-all shadow-sm"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="#" 
              className="p-2.5 rounded-full bg-slate-50 text-slate-400 hover:bg-primary hover:text-white transition-all shadow-sm"
              title="Portfolio"
            >
              <Globe size={20} />
            </a>
          </div>
        </div>

        <Divider className="opacity-50" />

        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4 text-center md:text-left">
          <p className="text-slate-400 text-xs font-medium tracking-wide">
            © {currentYear} <span className="text-slate-600">FAHMY Social</span>. All rights reserved.
          </p>
          <p className="text-slate-400 text-xs flex items-center gap-1.5 font-medium">
            Made by 
            <span className="text-slate-800 font-bold hover:text-primary transition-colors cursor-default">
              Mohamed Fahmy
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}