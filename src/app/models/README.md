# Models
This folder contains all interface classes of the project.

```typescript
interface Person {
    name: string;
    gender: string;
    age: number;
    isSingle: false;
}
```

To export the interface to components
```typescript
export interface Person {
           name: string;
           gender: string;
           age: number;
           isSingle: false;
       }
```

To import at component
```typescript
import { Person } from "./path";
```
