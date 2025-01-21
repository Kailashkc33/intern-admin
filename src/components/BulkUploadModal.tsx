"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, X } from "lucide-react"
import { useRouter } from "next/navigation"
import * as XLSX from "xlsx"

interface FileData {
  User_Id: string
  User_name: string
  User_email: string
  User_contact_number: string
  Project_id: string
}

export function BulkUploadModal() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB in bytes

  const checkForDuplicates = async (data: FileData[]): Promise<boolean> => {
    // Get unique User_Ids from the file
    const fileUserIds = [...new Set(data.map((row) => row.User_Id))]

    // Check for duplicates within the file
    if (fileUserIds.length < data.length) {
      return true
    }

    try {
      // Simulate checking against database
      // In real implementation, this would be an API call to check against the database
      const existingUserIds = ["1001", "1002"] // Example existing IDs
      const hasDatabaseDuplicates = fileUserIds.some((id) => existingUserIds.includes(id))

      return hasDatabaseDuplicates
    } catch (error) {
      console.error("Error checking for duplicates:", error)
      return false
    }
  }

  const processFile = async (file: File): Promise<FileData[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = async (e) => {
        try {
          const data = e.target?.result
          const workbook = XLSX.read(data, { type: "array" })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const jsonData = XLSX.utils.sheet_to_json(worksheet) as FileData[]
          resolve(jsonData)
        } catch (error) {
          reject(new Error("Error processing file"))
        }
      }

      reader.onerror = () => reject(new Error("Error reading file"))
      reader.readAsArrayBuffer(file)
    })
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setError(null)

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds the 10 MB limit. Please upload a smaller file.")
        e.target.value = ""
        return
      }

      try {
        const data = await processFile(file)
        const hasDuplicates = await checkForDuplicates(data)

        if (hasDuplicates) {
          setError("Data is duplicating. Please check and upload again.")
          e.target.value = ""
          return
        }

        setIsUploading(true)
        const formData = new FormData()
        formData.append("file", file)

        // Simulated API call
        await new Promise((resolve) => setTimeout(resolve, 3000))

        setUploadComplete(true)
        setIsUploading(false)

        setTimeout(() => {
          setIsOpen(false)
          router.refresh()
        }, 2000)
      } catch (error) {
        setError("An error occurred while processing the file. Please try again.")
        setIsUploading(false)
      } finally {
        e.target.value = ""
      }
    }
  }

  return (
    <>
      <Button variant="outline" className="bg-gray-100 border-0" onClick={() => setIsOpen(true)}>
        <Upload className="mr-2 h-4 w-4" />
        Bulk Upload
      </Button>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!isUploading) {
            setIsOpen(open)
            if (!open) {
              setError(null)
              setUploadComplete(false)
            }
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center">Bulk Upload Projects</DialogTitle>
            {!isUploading && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            )}
          </DialogHeader>

          {error && <div className="text-center text-red-500 font-medium">{error}</div>}

          {!isUploading && !uploadComplete && !error ? (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-gray-500">Upload an Excel sheet to assign multiple projects at once.</p>
                <p className="text-gray-500">Maximum file size: 10MB</p>
              </div>
              <div className="flex justify-center">
                <input
                  id="file-upload"
                  type="file"
                  accept=".xlsx,.csv"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  variant="secondary"
                  className="px-8"
                  type="button"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  Select File
                </Button>
              </div>
            </div>
          ) : isUploading ? (
            <div className="py-10 text-center space-y-6">
              <p className="text-gray-600 px-4">
                Assigning Projects, Please wait till we process your spreadsheet and assign projects. Please do not
                close this browser.
              </p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-900 border-t-transparent"></div>
              </div>
            </div>
          ) : (
            uploadComplete && (
              <div className="py-10 text-center space-y-6">
                <p className="text-gray-600 px-4">
                  Your upload is successful, you may close this window to refresh this page.
                </p>
              </div>
            )
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

