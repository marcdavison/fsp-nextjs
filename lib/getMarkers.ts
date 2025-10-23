export async function getMarkersFromRTDB() {
  const ONE_DAY = new Date().toISOString().split('T')[0];
  const res = await fetch(`https://us-central1-footy-score-predictor.cloudfunctions.net/getMarkers?ts=${ONE_DAY}`);
  const { markers } = await res.json();
  return markers;
}