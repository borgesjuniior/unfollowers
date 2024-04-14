# Unfollower

Unfollower é um script simples desenvolvido para ajudá-lo a gerenciar sua conta no Instagram. Se você está curioso para saber quem não está seguindo de volta, este script é para você.

## Funcionalidades

- **Listagem de Não Seguidores**: Este script permite que você obtenha uma lista de todas as pessoas que você segue no Instagram, mas que não estão te seguindo de volta.
- **Listagem de Seguidores Não Seguidos** (Em desenvolvimento): Em breve, você poderá visualizar uma lista das pessoas que te seguem, mas que você não está seguindo de volta.
- **Deixar de Seguir Não Seguidores** (Em desenvolvimento): Em breve, você poderá utilizar o script para deixar de seguir automaticamente todas as pessoas que não estão te seguindo de volta.
- **Interface** (Em desenvolvimento): Interface amigável para que você não precise visualizar os usuários no console do navegador.

## Como Usar

Para usar este script, siga estas etapas simples:

1. Faça login em sua conta do Instagram.
2. Abra o console do desenvolvedor no seu navegador. Isso pode ser feito pressionando `Ctrl + Shift + J` (Windows/Linux) ou `Cmd + Option + J` (Mac) ou clicando com o botão direito do mouse em qualquer lugar da página, selecionando "Inspecionar" e indo para a guia "Console".
3. Cole o código do script a seguir no console e pressione Enter.
```javascript
function getCookie(e){let t=`; ${document.cookie}`,n=t.split(`; ${e}=`);if(2===n.length)return n.pop().split(";").shift()}function urlGenerator(e){let{ds_user_id:t,max_id:n,friendship:r}=e;return`https://www.instagram.com/api/v1/friendships/${t}/${r}/?count=12${n?`&max_id=${n}`:""}`}async function getUsers(e){let t=getCookie("ds_user_id"),n=getCookie("csrftoken"),r="936619743392459",o=0,s=!0,l=[];for(;!0===s;){let i=urlGenerator({ds_user_id:t,friendship:e,max_id:o}),a=await fetch(i,{headers:{"x-csrftoken":n,"x-ig-app-id":r}}),u=await a.json();s=u.big_list,o=u.next_max_id,l.push(...u?.users)}return l}async function getUnfollowers(){let[e,t]=await Promise.all([getUsers("following"),getUsers("followers"),]);if(!t.length){console.log("You have no followers");return}let n=e.filter(e=>!t.find(t=>t.username===e.username)),r=n.map(e=>({username:e.username,full_name:e.full_name}));return console.table(r),r}getUnfollowers();
```
## Contribuição

Contribuições são bem-vindas! Se você tiver ideias para melhorar este script ou encontrar problemas, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Aviso Legal

Este projeto é apenas para fins educacionais. Use-o por sua própria conta e risco.
