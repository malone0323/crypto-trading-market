import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { CustomButton } from '../ui/custom-button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2 } from 'lucide-react'

export function WhitelistManagement() {
  const [whitelistedAddresses, setWhitelistedAddresses] = useState<string[]>([])
  const [newAddress, setNewAddress] = useState('')

  const addAddress = () => {
    if (newAddress && !whitelistedAddresses.includes(newAddress)) {
      setWhitelistedAddresses([...whitelistedAddresses, newAddress])
      setNewAddress('')
    }
  }

  const removeAddress = (address: string) => {
    setWhitelistedAddresses(whitelistedAddresses.filter(a => a !== address))
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Enter wallet address"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
        />
        <CustomButton variant="gold" onClick={addAddress}>Add</CustomButton>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Wallet Address</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {whitelistedAddresses.map((address, index) => (
            <TableRow key={index}>
              <TableCell>{address}</TableCell>
              <TableCell>
                <CustomButton variant="destructive" size="sm" onClick={() => removeAddress(address)}>
                  <Trash2 className="w-4 h-4" />
                </CustomButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
