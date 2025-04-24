// components/providers.tsx
'use client';

import {PrivyProvider} from '@privy-io/react-auth';

export default function Providers({children}: {children: React.ReactNode}) {
  return(
  <PrivyProvider appId='cm9ssu3xu01atl50mlfcy05en'>
    {children}
  </PrivyProvider>
    )
}
//   <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}>