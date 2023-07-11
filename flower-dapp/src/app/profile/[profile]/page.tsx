
interface ProfileProps {
  params : {profile : string}
}

export default function Profile({ params : { profile } }: ProfileProps){
  
  return(
    <div className = "bg-green-200">
      {profile}
    </div>
  )
}

