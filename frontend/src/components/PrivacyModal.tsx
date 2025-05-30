import React from "react";

type PrivacyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.06)] z-50 flex items-center justify-center">
      <div className="bg-white/90 rounded-lg shadow-lg max-w-lg w-full relative">
        {/* Sticky toppbar med stängknapp */}
        <div className="sticky top-0 bg-white/90 z-10 flex justify-center py-2">
          <button
            className="bg-white rounded-full w-10 h-10 text-2xl font-bold shadow hover:bg-gray-200"
            onClick={onClose}
            aria-label="Stäng modal"
          >
            &times;
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-6 sm:px-8 px-4">
          <h4 className="text-2xl font-medium mb-2 text-center">
            GRUNDLÄGGANDE INFORMATION OM ANVÄNDARVILLKOR OCH DATASKYDD
          </h4>

          <h4 className="font-light text-xl">Personuppgiftsansvarig</h4>
          <p className="text-sm text-gray-700 mb-5">
            AO Bea AB ansvarar för behandlingen av dina personuppgifter i
            enlighet med gällande dataskyddslagstiftning.
          </p>

          <h4 className="font-light text-xl">Syfte med datainsamling</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 mb-5">
            <li>Skapa och hantera ditt konto</li>
            <li>Ge dig tillgång till våra tjänster</li>
            <li>Skicka uppdateringar om din beställning</li>
            <li>Tillhandahålla kundsupport</li>
          </ul>

          <h4 className="font-light text-xl">Delning av information</h4>
          <p className="text-sm text-gray-700 mb-5">
            Vi samarbetar med tekniska partners och logistikleverantörer både
            inom och utanför EU. Dessa aktörer får endast tillgång till dina
            uppgifter i den mån det krävs för att uppfylla sitt uppdrag, med
            högsta krav på säkerhet.
          </p>

          <h4 className="font-light text-xl">Dina rättigheter</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 mb-5">
            <li>Få tillgång till dina uppgifter</li>
            <li>Rätta felaktiga uppgifter</li>
            <li>Radera dina uppgifter</li>
            <li>Invända mot behandling</li>
          </ul>

          <h4 className="font-light text-xl">Mer information</h4>
          <p className="text-sm text-gray-700 mb-5">
            Vid frågor, kontakta support@aobea.se.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
