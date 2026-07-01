/**
 * Fundo do Hero: imagem escura de ondas roxas.
 *
 * Renderizado no AppLayout ANTES do SystemCoreLayer para ficar ATRÁS do
 * cubo 3D global (ambos em z-0, ordem do DOM decide) e atrás do conteúdo
 * (main é z-10). Fixado na viewport do topo (h-screen), igual ao cubo,
 * e não captura cliques.
 */
export function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-screen overflow-hidden"
    >
      <img
        src="/Ondas_fundo.png"
        alt=""
        className="h-full w-full object-cover object-center"
      />
      {/* Escurece o lado do texto e funde as bordas na página */}
      <div className="absolute inset-0 bg-gradient-to-r from-background-primary via-background-primary/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-background-primary/60 via-transparent to-background-primary" />
    </div>
  );
}
