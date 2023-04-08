'use client';

import * as React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

interface IDialog {
  title: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export function Dialog({ title, open, setOpen, children }: IDialog) {
  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen} modal>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="bg-black/70 data-[state=open]:animate-overlayShow fixed inset-0 z-10 blur-3xl" />

        <RadixDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-20">
          <RadixDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">{title}</RadixDialog.Title>
          <RadixDialog.Description asChild>{children}</RadixDialog.Description>

          <RadixDialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
