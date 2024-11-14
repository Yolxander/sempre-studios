"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react'
import { DemoSite } from './demo-access-catalog'

interface DemoDialogProps {
    selectedDemo: DemoSite | null
    setSelectedDemo: (demo: DemoSite | null) => void
}

export default function DemoDialogComponent({ selectedDemo, setSelectedDemo }: DemoDialogProps) {
    return (
        <Dialog open={!!selectedDemo} onOpenChange={() => setSelectedDemo(null)}>
            <DialogContent className="bg-white rounded-3xl">
                <DialogHeader>
                    <DialogTitle>{selectedDemo?.name}</DialogTitle>
                    <DialogDescription>{selectedDemo?.industry}</DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <img src={selectedDemo?.imageUrl} alt={selectedDemo?.name} className="w-full h-64 object-cover rounded-md mb-4" />
                    <p className="text-gray-600 mb-4">{selectedDemo?.description}</p>
                    <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-full" onClick={() => window.open(selectedDemo?.demoUrl, '_blank', 'noopener,noreferrer')}>
                        Open Full Demo <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}