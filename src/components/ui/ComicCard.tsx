import React from 'react';

interface ComicCardProps {
  title: string;
  color: 'blue' | 'green' | 'yellow' | 'pink' | 'purple' | 'orange';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

const colorMap = {
  blue: 'bg-blue-100 border-blue-900',
  green: 'bg-emerald-100 border-emerald-900',
  yellow: 'bg-yellow-100 border-yellow-900',
  pink: 'bg-pink-100 border-pink-900',
  purple: 'bg-purple-100 border-purple-900',
  orange: 'bg-orange-100 border-orange-900',
};

export const ComicCard: React.FC<ComicCardProps> = ({ title, color, children, icon, className = '', action }) => {
  return (
    <div className={`
      relative flex flex-col h-full
      bg-white 
      border-2 border-black 
      rounded-xl 
      shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
      transition-all hover:-translate-y-0.5
      overflow-hidden
      ${className}
    `}>
      <div className={`
        flex items-center justify-between px-4 py-3 border-b-2 border-black
        ${colorMap[color]}
      `}>
        <div className="flex items-center gap-2 font-bold text-lg text-black">
          {icon}
          <span>{title}</span>
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="p-4 flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export const ComicButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'danger' | 'ghost' }> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyle = "px-3 py-1.5 rounded-lg font-bold border-2 border-black text-sm transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
  
  const variants = {
    primary: "bg-black text-white hover:bg-neutral-800",
    danger: "bg-red-400 text-black hover:bg-red-500",
    ghost: "bg-white text-black hover:bg-gray-50",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const ComicInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input 
    {...props}
    className={`w-full border-2 border-black rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all placeholder:text-gray-500 text-gray-900 font-medium ${props.className || ''}`}
  />
);

export const MarkdownRenderer: React.FC<{ content: string; className?: string }> = ({ content, className = '' }) => {
  const parseInline = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, i) => 
        (part.startsWith('**') && part.endsWith('**')) 
            ? <strong key={i} className="font-black text-black">{part.slice(2, -2)}</strong> 
            : part
    );
  };

  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      {content.split('\n').map((line, i) => {
        if (line.startsWith('# ')) return <h1 key={i} className="text-xl font-black mt-3 mb-2 text-black border-b-2 border-black/10 pb-1">{line.replace('# ', '')}</h1>;
        if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-black mt-3 mb-1 text-gray-900">{line.replace('## ', '')}</h2>;
        if (line.startsWith('### ')) return <h3 key={i} className="text-base font-bold mt-2 mb-1 text-gray-900">{line.replace('### ', '')}</h3>;
        if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-black pl-3 my-2 italic bg-gray-50 py-1 text-gray-800">{parseInline(line.replace('> ', ''))}</blockquote>;
        if (line.startsWith('- ')) return <li key={i} className="ml-5 list-disc text-gray-800 font-medium marker:text-black">{parseInline(line.replace('- ', ''))}</li>;
        if (line.trim() === '') return <div key={i} className="h-2"></div>;
        return <p key={i} className="text-gray-800 leading-relaxed font-medium mb-1">{parseInline(line)}</p>;
      })}
    </div>
  );
};