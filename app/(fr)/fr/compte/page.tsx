import AccountPanel from '@/components/AccountPanel';
export const metadata={title:'Mon compte | Atlas',robots:{index:false,follow:false}};
export default function Page(){return <AccountPanel locale="fr" signupEnabled={process.env.ACCOUNTS_SIGNUP_ENABLED==='1'} available={!!process.env.NEXT_PUBLIC_SUPABASE_URL}/>;}
