"use client";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { FaTrash } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

const DeletePost = ({ id, onDelete }: { id: number; onDelete: () => void }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const deleteRes = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (deleteRes.ok) {
        onDelete();
        router.refresh();
      } else {
        alert("Data gagal dihapus");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmDelete = async () => {
    await handleDelete();
    onOpenChange();
  };
  return (
    <div>
      <Button color="danger" onClick={onOpen} startContent={<FaTrash />}>
        Delete
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent className="bg-neutral-950 text-neutral-100">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Hapus Data
              </ModalHeader>
              <ModalBody>
                <p>Apakah anda yakin ingin menghapus data ini?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="ghost" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  variant="ghost"
                  startContent={<FaTrash />}
                  onPress={handleConfirmDelete}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeletePost;
