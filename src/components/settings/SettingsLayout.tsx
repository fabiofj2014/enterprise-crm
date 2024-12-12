import React, { useEffect } from 'react';
import { User, Lock, Globe, Palette, Database, Link } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileSettings from './ProfileSettings';
import SecuritySettings from './SecuritySettings';
import LocalizationSettings from './LocalizationSettings';
import IntegrationsSettings from './IntegrationsSettings';
import AppearanceSettings from './AppearanceSettings';
import DataManagementSettings from './DataManagementSettings';

const settingsSections = [
  {
    id: 'profile',
    name: 'Configurações de Perfil',
    icon: User,
    description: 'Atualize suas informações pessoais e preferências',
    component: ProfileSettings
  },
  {
    id: 'security',
    name: 'Segurança',
    icon: Lock,
    description: 'Gerencie sua senha e configurações de segurança',
    component: SecuritySettings
  },
  {
    id: 'integrations',
    name: 'Integrações',
    icon: Link,
    description: 'Configure integrações com outras ferramentas',
    component: IntegrationsSettings
  },
  {
    id: 'localization',
    name: 'Localização',
    icon: Globe,
    description: 'Defina seu idioma e preferências regionais',
    component: LocalizationSettings
  },
  {
    id: 'appearance',
    name: 'Aparência',
    icon: Palette,
    description: 'Personalize a aparência do seu espaço de trabalho',
    component: AppearanceSettings
  },
  {
    id: 'data',
    name: 'Gerenciamento de Dados',
    icon: Database,
    description: 'Controle seus dados e opções de exportação',
    component: DataManagementSettings
  }
];

export default function SettingsLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = React.useState('profile');

  // Update active section based on URL hash
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && settingsSections.some(section => section.id === hash)) {
      setActiveSection(hash);
    }
  }, [location.hash]);

  // Update URL hash when section changes
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    navigate(`#${sectionId}`, { replace: true });
  };

  const ActiveComponent = settingsSections.find(s => s.id === activeSection)?.component || ProfileSettings;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Configurações</h1>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <nav className="space-y-1">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionChange(section.id)}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeSection === section.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <section.icon className="mr-3 h-5 w-5" />
                <span className="truncate">{section.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="col-span-12 lg:col-span-9">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}