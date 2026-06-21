import SiteEditor from './content/SiteEditor.jsx';
import HeroEditor from './content/HeroEditor.jsx';
import AboutEditor from './content/AboutEditor.jsx';
import StagesEditor from './content/StagesEditor.jsx';
import StatsEditor from './content/StatsEditor.jsx';
import AdmissionsEditor from './content/AdmissionsEditor.jsx';
import FeaturesEditor from './content/FeaturesEditor.jsx';
import ContactEditor from './content/ContactEditor.jsx';
import FooterEditor from './content/FooterEditor.jsx';

// The "blueprint" editor: every public section is editable here, bilingually.
// Each card saves its own section independently via PUT /api/content/:section.
export default function ContentEditor({ content, onSaved }) {
  return (
    <div className="editor">
      <p className="editor-hint">
        كل ما تراه هنا يظهر مباشرةً على الموقع. حرّر النصوص بالعربية والإنجليزية واضغط «حفظ» لكل قسم.
      </p>
      <SiteEditor data={content.site} onSaved={onSaved} />
      <HeroEditor data={content.hero} onSaved={onSaved} />
      <AboutEditor data={content.about} onSaved={onSaved} />
      <StagesEditor data={content.stages} onSaved={onSaved} />
      <StatsEditor data={content.stats} onSaved={onSaved} />
      <AdmissionsEditor data={content.admissions} onSaved={onSaved} />
      <FeaturesEditor data={content.features} onSaved={onSaved} />
      <ContactEditor data={content.contact} onSaved={onSaved} />
      <FooterEditor data={content.footer} onSaved={onSaved} />
    </div>
  );
}
