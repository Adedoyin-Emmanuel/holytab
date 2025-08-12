import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useConfessionDB } from "@/hooks/confessions-db";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const AnnouncementBanner = () => {
  const { shouldShowBanner, fetchNewConfessions } = useConfessionDB();
  const [isUpdating, setIsUpdating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleUpdateConfessions = async () => {
    setIsUpdating(true);
    try {
      const result = await fetchNewConfessions();
      setModalTitle(
        result.success ? "Update Complete" : "No Updates Available"
      );
      setModalMessage(result.message);
      setShowModal(true);
    } catch (error) {
      setModalTitle("Update Failed");
      setModalMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      setShowModal(true);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!shouldShowBanner) {
    return null;
  }

  return (
    <>
      <div className="bg-[#F28C8C33] dark:bg-[#F5B7001A] p-4 text-sm flex justify-between items-center fixed top-0 left-0 right-0 z-50 transition-opacity duration-500 ease-in-out w-full">
        <div className="flex mx-auto items-center gap-x-3 gap-y-1 text-[16px] flex-wrap p-2">
          <svg
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height={"1.5em"}
            focusable={false}
            className="md:block hidden"
          >
            <path
              fill="currentColor"
              d="M4.5 16.474a2.5 2.5 0 0 1-1.436-2.264V9.791a2.5 2.5 0 0 1 2.5-2.5h4.343c.793 0 1.581-.132 2.33-.392c1.859-.705 3.792-1.727 5.24-2.922l.869-.718a1 1 0 0 1 1.587.808v6.717a1.24 1.24 0 0 1 0 2.433v6.718a1.001 1.001 0 0 1-1.588.807l-.868-.718c-1.446-1.195-3.364-2.214-5.226-2.891a7.07 7.07 0 0 0-2.328-.394c-.609-.029-1.265-.029-1.265-.029v2.147a2.08 2.08 0 0 1-4.158 0zm1 .236v2.147a1.079 1.079 0 1 0 2.158 0V16.71H5.564zm6-.882l.142.04a17.632 17.632 0 0 1 6.473 3.385l.818.677V4.071l-.82.677a17.605 17.605 0 0 1-6.468 3.379l-.145.041zm-2.842-.118H10.5V8.291H5.564a1.5 1.5 0 0 0-1.5 1.5v4.419a1.5 1.5 0 0 0 1.499 1.5z"
            />
          </svg>{" "}
          <h2 className="bai-jamjuree">Hey, check for new confessions.</h2>
          <Button
            onClick={handleUpdateConfessions}
            disabled={isUpdating}
            className="md:mt-0 mt-2 bg-[#FA7272] hover:bg-[#FA7272]/90 dark:bg-[#F5B700] dark:hover:bg-[#F5B700]/90 text-white dark:text-black"
          >
            {isUpdating ? "Updating..." : "Update Confessions"}
          </Button>{" "}
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-[#EBEBEB] dark:bg-[#1A1A1A] border-[#A6A6A6] dark:border-[#333333] p-8">
          <DialogHeader>
            <DialogTitle className="bai-jamjuree text-2xl font-semibold mb-6">
              {modalTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <p className="text-lg mb-6">{modalMessage}</p>
            <Button
              onClick={() => setShowModal(false)}
              className="bg-[#FA7272] hover:bg-[#FA7272]/90 dark:bg-[#F5B700] dark:hover:bg-[#F5B700]/90 text-white dark:text-black"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AnnouncementBanner;
