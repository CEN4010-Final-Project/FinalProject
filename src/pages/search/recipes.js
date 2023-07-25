import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
const recipes = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("s");

  if (search) {
    return <>
    {search}
  </>;
  } else {
    //router.push('')
  }
  
  
  
};

export default recipes;
