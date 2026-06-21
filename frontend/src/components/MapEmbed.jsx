import { useUi } from '../context/UiContext.jsx';

// Lightweight Google Maps embed (no API key needed) centred on the school's
// Maadi address. Uses an iframe pointed at the public maps output.
export default function MapEmbed({ query = 'Maadi Canal School, Maadi, Cairo' }) {
  const { t } = useUi();
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  return (
    <div className="map-embed" data-reveal>
      <iframe
        title={t('locationTitle')}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
