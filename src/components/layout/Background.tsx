/** Fixed decorative layers: scroll progress, aurora blobs and the grid. */
export default function Background() {
  return (
    <>
      <div className="progress" aria-hidden="true" />
      <div className="aurora" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="gridlines" aria-hidden="true" />
    </>
  );
}
