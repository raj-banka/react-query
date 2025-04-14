import { useState  } from "react";
import { useQueryClient , useMutation} from "@tanstack/react-query";
export default function Form() {   
    
    const [text, setText] = useState('');
    
    const createTodo  = (text) => {
        return () => fetch("http://localhost:8000/todo/create",
            {
                method : "POST",
                headers : {
                    'Content-Type' : "application/json",
                },
                body : JSON.stringify({title: text}),
            }
        )
    }

    const queryClient = useQueryClient();
    const todoMutation = useMutation({
        mutationFn : createTodo(text),
        onSuccess : (text)=>{
            console.log("sucess");
            queryClient.invalidateQueries({queryKey : ['todo']});
            // queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })

    return (
        <div>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={()=>todoMutation.mutate()}>Submit</button>
        </div>
    );
}