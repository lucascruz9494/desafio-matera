export const loginPage = {
    usuario:"#ipt_email",
    senha:"#ipt_password",
    recuperaSenha:'[href="/recovery-password"]',
    selectTipoAcesso:"#ipt_optionsingin"
}

export const genericElements={
    confirmar:".btn.btn-primary",
    configFincanceira:'[class="btn btn-white"]',
    listaUsuarios:'[href="/user"]',
    novoUsuario:'[href="/user/new"]',
    erroCampo:".text-danger.form-text",
    alerta:'[role="alert"]',
    tituloPage:".h1"


}

export const usuarioPage={
    cpf:"#cpf",
    email:"#email",
    nome:"#nome",
    sobrenome:"#sobrenome",
    perfil:"#perfil",
    nomeCompleto:".h5.mb-0.d-block",
    permissaoListarUsuarios:'[for="permissoes[CRED_USUARIOS_LIST]"]',
    permissaoListarPerfis:'[for="permissoes[CRED_PERFIL_LIST]"]',
    checkPermissaoListarUsuarios:'[name="permissoes[CRED_USUARIOS_LIST]"]',
    checkPermissaoListarPerfis:'[name="permissoes[CRED_PERFIL_LIST]"]',
    excluirUsuario:".text-danger.cursor-pointer",
    modal:".modal-footer",
    campoPerfil:"#descricao",
    btnFuncionalidades:".text-secondary",
    

}

export const usuariosListagemPage={
    campoPesquisa:"#search",
    pesquisar:'[class="input-group-text"]',
    card:".cards.cursor-pointer",
    cardInfo:'.cards-body',
    cardCpf:'[class="text-gray"]',
    cancelarPesquisa:".cancel-input-text",
    listaVazia:".h2.mt-4"


}

export const links={
    esqueceuSenha:'[href="/recovery-password"]',
    listagemUsuarios:'[href="/user"]',
    criaUsuario:'[href="/user/new"]',
    listagemPerfis:'[href="/profiles"]'
}