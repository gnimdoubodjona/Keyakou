import { getAllSoumissions } from "../action";


export default async function Exploration() {
  const soumissions = await getAllSoumissions();

  return (
    <div >
     
      <div >
        {soumissions.map((s, i) => (
          <div 
            key={s.id} 
            className=""
          >
            {/* En-tête */}
            <div className="">
              <div className="">
                <div>
                  <h2 className="">
                    {s.userName || s.userEmail.split('@')[0]}
                  </h2>
                  <p className="">
                    Challenge: <strong>{s.challengeTitre}</strong>
                  </p>
                </div>
                {/* <div style={{ 
                  padding: '4px 12px', 
                  backgroundColor: 
                    s.statut === 'valide' ? '#d1fae5' : 
                    s.statut === 'rejete' ? '#fee2e2' : '#fef3c7',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: 
                    s.statut === 'valide' ? '#065f46' : 
                    s.statut === 'rejete' ? '#991b1b' : '#92400e'
                }}>
                  {s.statut}
                </div> */}
              </div>
              
              {/* <div style={{ display: 'flex', gap: '15px', fontSize: '14px' }}>
                <span>Progression: <strong>{s.progression}%</strong></span>
                <span>•</span>
                <span>{new Date(s.dateSoumission).toLocaleDateString('fr-FR')}</span>
              </div> */}
            </div>
            
            {/* SECTION VIDÉO - IMPORTANT: AFFICHAGE RÉEL DE LA VIDÉO */}
            {s.demo && (
              <div >
                <h3 >Vidéo de démo</h3>
                <div>
                  {/* CE CI EST LE LECTEUR VIDÉO RÉEL */}
                  <video 
                    controls 
                    width="100%" 
                    
                    preload="metadata"
                  >
                    <source src={s.demo} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                </div>
                {/* <p >
                  Source: {s.demo.substring(0, 50)}...
                </p> */}
              </div>
            )}
            
            {/* SECTION IMAGE - IMPORTANT: AFFICHAGE RÉEL DE L'IMAGE */}
            {/* {s.capture_ecran && (
              <div style={{ margin: '20px 0' }}>
                <h3 style={{ marginBottom: '10px', fontSize: '16px' }}>Capture d'écran</h3>
                {/* CE CI EST L'IMAGE RÉELLE 
                <img
                  src={s.capture_ecran}
                  alt={`Capture d'écran de ${s.userName || s.userEmail}`}
                  style={{
                    maxWidth: '800px',
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  loading="lazy"
                />
                <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  Source: {s.capture_ecran.substring(0, 50)}...
                </p>
              </div>
            )} */}
            
            {/* SECTION LIENS */}
            {/* {(s.url || s.projet_url) && (
              <div style={{ margin: '20px 0' }}>
                <h3 style={{ marginBottom: '10px', fontSize: '16px' }}>Liens</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {s.url && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ 
                        backgroundColor: '#333', 
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        GitHub
                      </span>
                      <a 
                        href={s.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#0366d6', textDecoration: 'none' }}
                      >
                        {s.url.length > 60 ? s.url.substring(0, 60) + '...' : s.url}
                      </a>
                    </div>
                  )}
                  
                  {s.projet_url && s.projet_url !== "pas encore" && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ 
                        backgroundColor: '#3b82f6', 
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        Live
                      </span>
                      <a 
                        href={s.projet_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#0366d6', textDecoration: 'none' }}
                      >
                        {s.projet_url.length > 60 ? s.projet_url.substring(0, 60) + '...' : s.projet_url}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )} */}
            
            {/* SECTION CODE */}
            {/* {s.snippet && (
              <div style={{ margin: '20px 0' }}>
                <h3 style={{ marginBottom: '10px', fontSize: '16px' }}>Code Snippet</h3>
                <pre style={{
                  background: '#1e1e1e',
                  color: '#d4d4d4',
                  padding: '15px',
                  borderRadius: '8px',
                  overflowX: 'auto',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}>
                  {s.snippet}
                </pre>
              </div>
            )} */}
            
            {/* COMMENTAIRE */}
            {s.commentaire_de_soumission && (
              <div >
                <h4 >
                  Commentaire
                </h4>
                <p >
                  {s.commentaire_de_soumission}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}