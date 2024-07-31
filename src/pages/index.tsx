/* eslint-disable @next/next/no-img-element */
export default function Home() {
  const shareOrDownload = async () => {
    const blob = await fetch("/video.mp4").then((res) => res.blob());
    const data = {
      files: [
        new File([blob], "/video.mp4", {
          type: blob.type,
        }),
      ],
      title: "Teste de titulo",
      text: "teste de texto",
    };
    if (navigator.canShare?.(data)) {
      try {
        await navigator.share(data);
      } catch (err) {
        if ((err as any).name !== "AbortError") {
          console.error((err as any).name, (err as any).message);
        }
      } finally {
        return;
      }
    }
    alert("Não foi possível compartilhar, tentando baixar");
    // Fallback
    const a = document.createElement("a");
    a.download = "/video.mp4";
    a.style.display = "none";
    a.href = URL.createObjectURL(blob);
    a.addEventListener("click", () => {
      setTimeout(() => {
        URL.revokeObjectURL(a.href);
        a.remove();
      }, 1000);
    });
    document.body.append(a);
    a.click();
  };
  return (
    <main>
      <h1>Share a file</h1>
      <img
        width="200"
        height="200"
        alt="A cat walking in the snow."
        src="/imagem.jpg"
      />
      <button onClick={shareOrDownload}>Baixar</button>
    </main>
  );
}
