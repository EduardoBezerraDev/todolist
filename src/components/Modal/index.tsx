
const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M18.364 5.636a.999.999 0 0 0-1.414 0L12 10.586 7.05 5.636a.999.999 0 1 0-1.414 1.414L10.586 12l-4.95 4.95a.999.999 0 1 0 1.414 1.414L12 13.414l4.95 4.95a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L13.414 12l4.95-4.95a.999.999 0 0 0 0-1.414z" />
              </svg>
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal