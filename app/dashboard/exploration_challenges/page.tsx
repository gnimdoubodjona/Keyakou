import { getAllSoumissions } from "../action";

export default async function Exploration() {
  // Récupérer toutes les soumissions
  const soumissions = await getAllSoumissions();

  return (
    <div>
      <h1>Exploration des Soumissions</h1>
      <p>Total: {soumissions.length} soumission(s)</p>
      
      {soumissions.length === 0 ? (
        <p>Aucune soumission disponible</p>
      ) : (
        <div>
          {soumissions.map((soumission, index) => (
            <div key={soumission.id} style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
              <h2>Soumission #{index + 1}</h2>
              
              <div>
                <p><strong>ID:</strong> {soumission.id}</p>
                <p><strong>Utilisateur:</strong> {soumission.userName || soumission.userEmail}</p>
                <p><strong>Challenge:</strong> {soumission.challengeTitre}</p>
                <p><strong>Progression:</strong> {soumission.progression}%</p>
                <p><strong>Statut:</strong> {soumission.statut}</p>
                <p><strong>Date:</strong> {new Date(soumission.dateSoumission).toLocaleString()}</p>
                
                <h3>Contenu de la soumission:</h3>
                <ul>
                  {soumission.url && <li><strong>GitHub:</strong> <a href={soumission.url} target="_blank">{soumission.url}</a></li>}
                  {soumission.projet_url && <li><strong>Projet URL:</strong> <a href={soumission.projet_url} target="_blank">{soumission.projet_url}</a></li>}
                  {soumission.snippet && (
                    <li>
                      <strong>Snippet:</strong>
                      <pre>{soumission.snippet.substring(0, 200)}{soumission.snippet.length > 200 ? '...' : ''}</pre>
                    </li>
                  )}
                  {soumission.demo && <li><strong>Vidéo:</strong> <a href={soumission.demo} target="_blank">{soumission.demo}</a></li>}
                  {soumission.capture_ecran && <li><strong>Capture:</strong> <a href={soumission.capture_ecran} target="_blank">{soumission.capture_ecran}</a></li>}
                  {soumission.commentaire_de_soumission && <li><strong>Commentaire:</strong> {soumission.commentaire_de_soumission}</li>}
                </ul>
                
                <h3>Données techniques:</h3>
                <ul>
                  <li><strong>Participation ID:</strong> {soumission.participationId}</li>
                  <li><strong>Challenge ID:</strong> {soumission.challengeId}</li>
                  <li><strong>User ID:</strong> {soumission.userId}</li>
                  <li><strong>User Email:</strong> {soumission.userEmail}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}