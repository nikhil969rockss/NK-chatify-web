import { useRef, useState } from "react";
import useKeyBoardSound from "../hooks/useKeyboardSound";
import useChatStore from "../store/useChatStore";
import { toast } from "react-toastify";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";
import clsx from "clsx";

const MessageInput = () => {
  const { playRandomKeyStrokeSound } = useKeyBoardSound();
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({ text: message, image: imagePreview });

    clearStates({ clearText: true });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/"))
      return toast.error("Please select an image file");

    const reader = new FileReader();

    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const clearStates = ({ clearText }: { clearText?: boolean }) => {
    if (clearText) setMessage("");

    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4 border-t border-slate-700/50">
      {/* IMAGE PREVIEW UI */}
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              src={imagePreview}
              className="size-20 object-cover rounded-lg border border-slate-700"
              alt="Preview"
            />

            <button
              onClick={() => clearStates({ clearText: false })}
              type="button"
              className="absolute -top-2 -right-2 size-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
            >
              <XIcon className="size-4" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto flex space-x-4"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            isSoundEnabled === "true" && playRandomKeyStrokeSound();
          }}
          className="flex-1 px-4 py-2 rounded-lg bg-slate-800/50 border-slate-700/50"
          placeholder="Type your message..."
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          ref={fileInputRef}
        />

        <button
          className={clsx(
            " bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-4 transition-colors",
            imagePreview && "text-cyan-500",
          )}
          onClick={() => fileInputRef?.current?.click()}
          type="button"
        >
          <ImageIcon className="size-6" />
        </button>

        <button
          className={`bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-4 py-2 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed`}
          type="submit"
          disabled={!message.trim() && !imagePreview}
        >
          <SendIcon className="size-6" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
