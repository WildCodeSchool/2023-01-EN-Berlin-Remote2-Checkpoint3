## Recipe website

### Logical data model

```mermaid
erDiagram
    USERS ||--o{ FAVORITES : userid
    FAVORITES }o--|| RECIPIES : recipeid
    USERS ||--o{ RECIPIES : userid

    DISHTYPES ||--o{ DISHES : dishtypeid
    DISHES ||--o{ RECIPIES : dishid
    RECIPIES ||--|{ STEPS : recipeid
    RECIPIES ||--|{ INGREDIENTS : recipeid
```
### Conceptual data model

1. All columns of integer data type that are marked as non-composite primary keys should be auto-incremented.
2. All columns should be marked as NOT NULL, except for:
    - Quantity column in the Ingredients table (to represent ingredients of undefined quantity)

```mermaid
erDiagram
    USERS ||--o{ FAVORITES : userid
    FAVORITES }o--|| RECIPIES : recipeid
    USERS ||--o{ RECIPIES : userid

    DISHTYPES ||--o{ DISHES : dishtypeid
    DISHES ||--o{ RECIPIES : dishid
    RECIPIES ||--|{ STEPS : recipeid
    RECIPIES ||--|{ INGREDIENTS : recipeid

USERS {
    int userid PK
    varchar username UK
    varchar email UK
    varchar hashedpassword
}
FAVORITES {
    int userid FK,PK
    int recipeid FK,PK
}
DISHTYPES {
    int dishtypeid PK
    varchar typename UK
}
DISHES {
    int dishid PK
    varchar dishname UK
    int dishtype FK
}
RECIPIES {
    int recipeid PK
    int dishid FK
    varchar title UK
    int author FK
    timestamp creation
}
INGREDIENTS {
    int recipe FK, PK
    varchar unit PK
    int quantity
}
STEPS {
    int recipe FK, PK
    int order PK
    varchar description
}
```