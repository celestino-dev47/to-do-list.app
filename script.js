let tarefas = [];

const mensagem = document.getElementById("mensagem");

function salvarTarefas() {
	localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
	const tarefasSalvas = localStorage.getItem("tarefas");

	if (tarefasSalvas) {
		tarefas = JSON.parse(tarefasSalvas);
	}
}

function atualizar() {
	salvarTarefas();
	renderizarTarefas();
}

function adicionarTarefa() {
	const inputTarefa = document.getElementById("inputTarefa");
	let tarefa = inputTarefa.value.trim();

	if (tarefa == "") {
		let mensagemErro = "Digite uma tarefa para adicioná-la a sua lista!";
		mensagem.textContent = mensagemErro;
	} else {
		let mensagemSucesso = "Tarefa adicionada com sucesso!";
		mensagem.textContent = mensagemSucesso;
		tarefas.push(tarefa);
		atualizar();
	}

	inputTarefa.value = "";
}

function renderizarTarefas() {
	const listaTarefas = document.getElementById("listaTarefas");
	listaTarefas.innerHTML = "";

	for (let i = 0; i < tarefas.length; i++) {
		let novaTarefa = document.createElement("li");
		novaTarefa.textContent = tarefas[i];

		let botaoRemover = document.createElement("button");
		botaoRemover.className = "remover";
		botaoRemover.textContent = "Remover";
		botaoRemover.onclick = () => removerTarefa(i);

		let botaoEditar = document.createElement("button");
		botaoEditar.className = "editar";
		botaoEditar.textContent = "Editar";
		botaoEditar.onclick = () => editarTarefa(i);

		novaTarefa.appendChild(botaoRemover);
		novaTarefa.appendChild(botaoEditar);
		listaTarefas.appendChild(novaTarefa);
	}
}

function removerTarefa(i) {
	let confirmar = confirm("Quer apagar esta tarefa?");
	if (confirmar) {
		tarefas.splice(i, 1);
		renderizarTarefas();
		mensagem.textContent = "Tarefa removida com sucesso";
		atualizar();
	}
}

function editarTarefa(i) {
	let tarefaEditada = prompt("Edite a tarefa:");
	if (tarefaEditada.trim() !== "") {
		tarefas[i] = tarefaEditada;
		renderizarTarefas();
		mensagem.textContent = "Tarefa editada com sucesso";
		atualizar();
	}
}

function limparLista() {
	if (tarefas.length == 0) {
		mensagem.textContent = "Ainda não adicionou nenhuma tarefa";
	} else {
		let confirmar = confirm("Tem a certeza que quer apagar TODA lista?");
		if (confirmar) {
			tarefas.length = 0;
			renderizarTarefas();
			mensagem.textContent = "Lista de tarefas limpa com sucesso!";
			atualizar();
		}
	}
}

carregarTarefas();
renderizarTarefas();