import { Dispatch, SetStateAction } from "react";

interface ChatTextAreaProps {
  setVoice: Dispatch<SetStateAction<string>>;
}

const ChatTextArea: React.FC<ChatTextAreaProps> = ({ setVoice }) => {
  const loadCustomText = () => {
    setVoice("This is to test if the custom voice is working");
  };

  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src="/favicon.ico"
          alt=""
        />
      </div>
      <div className="min-w-full flex-1">
        <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
          <textarea
            rows={3}
            name="comment"
            id="comment"
            className="block w-full resize-none border-0 p-2 py-3 focus:ring-0 sm:text-sm "
            placeholder="Add your voice text..."
            defaultValue={""}
          />

          <div className=" inset-x-0 bottom-0 py-2 pl-3 pr-2">
            <div className="flex-shrink-0">
              <button
                onClick={() => loadCustomText()}
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Load Custom Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTextArea;
