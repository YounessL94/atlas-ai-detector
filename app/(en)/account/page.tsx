import AccountPanel from '@/components/AccountPanel';
export const metadata={title:'My account | Atlas',robots:{index:false,follow:false}};
export default function Page(){return <AccountPanel locale="en" signupEnabled={process.env.ACCOUNTS_SIGNUP_ENABLED==='1'} available={!!process.env.NEXT_PUBLIC_SUPABASE_URL}/>;}
