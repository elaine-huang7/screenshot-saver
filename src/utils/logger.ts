export const logger = {
  uploadStarted() {
    console.log("[Screenshot Saver] Upload started");
  },
  analysisCompleted() {
    console.log("[Screenshot Saver] Analysis completed");
  },
  saveCompleted(id: string) {
    console.log("[Screenshot Saver] Save completed", { id });
  },
  analysisError(error: unknown) {
    console.log("[Screenshot Saver] Analysis error", error);
  }
};
