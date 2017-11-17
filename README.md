---
title: KeystoneJS - INHAABIT Updates
---

Updates keystone with user privileges.
```
list.options.restrict = {
    match: { 
        //Restricts which documents are returned (in Keystone), based on the users' details
        //Shows all documents if user's role has isAdmin = true, or if the user has the correct field
        
        from: //field in User object to match
        path: //field in this List to match 
    },
    
    rolesCanView: [
        //Hides entire list unless role.isAdmin = true, or has the required role.
    ],
    rolesCanView: [
        //Prevents saving changes to documents unless role.isAdmin = true, or has the required role.
    ]
}
```

Keystone must be init with 'user roles', an array like this:
```
[
	{value: 1, label:'Admin', isAdmin:true},
	{value: 2, label:'User', canAccess: [lists], isAdmin:false},
];
```

TODO
---
Need to actually hide lists on menu