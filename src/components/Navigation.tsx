
import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, Calendar, Users, Settings, HelpCircle } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'scheduling', label: 'Agendamentos', icon: Calendar },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'settings', label: 'Configurações', icon: Settings },
    { id: 'help', label: 'Ajuda', icon: HelpCircle },
  ];

  return (
    <nav className="bg-white support-shadow border-r border-gray-100 w-64 min-h-screen p-4">
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-11 ${
                isActive 
                  ? 'support-gradient text-white support-shadow' 
                  : 'hover:bg-support-primary/5 text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
