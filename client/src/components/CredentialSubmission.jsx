import React, { useState } from 'react'
import { toast } from 'react-hot-toast'


const CredentialSubmission = ({ onClose, listing }) => {
    const [newField, setNewField] =  useState('')
    const [credential, setCredential] = useState([
        {type: "email", name: "Email", value: ""},
        {type: "password", name: "Password", value: ""}
    ])

    const handleAddField = ()=>{
        const name = newField.trim() ;
        if(!name) return toast.error("Field name cannot be empty");
        setCredential((prev) => [...prev, { type: "text", name, value: "" }]);
        setNewField("");
    }

    const handleSubmission = async(e) => {
        e.preventDefault()
        console.log(credential)
    }
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-100 flex items-center justify-center sm:p-4">
            <div className="bg-white sm:rounded-lg shadow-2xl w-full max-w-lg h-screen sm:h-[320px] flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white p-4 sm:rounded-t-lg flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate">{listing?.title}</h3>
                        <p className="text-sm text-indigo-100 truncate">
                            Adding Credentials for {listing?.username} on {listing?.platform}{" "}
                        </p>
                    </div>
                    <button onClick={onClose} className="ml-4 p-1 hover:bg-white/20 hover:bg-opacity-20 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmission} className="flex flex-col items-start gap-4 p-4 overflow-y-scroll">
                    {credential.map((cred, index) => (
                        <div key={cred.type} className="grid grid-cols-[2fr_3fr_1fr] items-center gap-2">
                            <label className="text-sm font-medium text-gray-800">{cred.name}</label>
                            <input type="text" value={cred.value} onChange={(e) => setCredential((prev) => prev.map((c, i) => (i === index ? { ...c, value: e.target.value } : c)))} className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded outline-indigo-400" />
                            <X className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => setCredential((prev) => prev.filter((_, i) => i !== index))} />
                        </div>
                    ))}

                    {/* Add More fields */}
                    <div className="flex items-center gap-2">
                        <input value={newField} onChange={(e) => setNewField(e.target.value)} type="text" placeholder="field name ..." className="outline-none border-b border-gray-200" />
                        <button type="button" onClick={handleAddField} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-700 cursor-pointer">
                            <CirclePlus className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 mt-4 rounded-md ">
                        Submit
                    </button>
                </form>
            </div>
        </div>
  )
}

export default CredentialSubmission
