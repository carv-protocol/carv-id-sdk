import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("my-element")
export class ProfilePage extends LitElement {
  @property({ type: Object }) user = { avatar: "", wallet: "", carvScore: 0 };
  @property({ type: Number }) balance = 0;
  @property({ type: Array }) tasks = [];

  static styles = css`
    .container {
      padding: 20px;
    }
    .user-info {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    .user-avatar {
      border-radius: 50%;
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    .user-details {
      font-size: 16px;
    }
    .carv-score {
      font-size: 12px;
      color: #888;
    }
    .balance-section {
      margin-bottom: 20px;
    }
    .task-list {
      display: flex;
      flex-direction: column;
    }
    .task-item {
      padding: 10px;
      border: 1px solid #ccc;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
  `;

  handleBind(task: any) {
    if (!task.bound) {
      task.bound = true;
      alert(`${task.name} bound`);
      this.requestUpdate();
    }
  }

  handleUnbind(task: any) {
    if (task.bound) {
      task.bound = false;
      alert(`${task.name} unbound`);
      this.requestUpdate();
    }
  }

  render() {
    return html`
      <div class="container">
        <div class="user-info">
          <img class="user-avatar" src=${this.user.avatar} alt="User Avatar" />
          <div class="user-details">
            <div>Wallet: ${this.user.wallet}</div>
            <div class="carv-score">CARV Score: ${this.user.carvScore}</div>
          </div>
        </div>

        <div class="balance-section">
          <h2>Reward Balance</h2>
          <div>${this.balance} USDT</div>
          <button @click=${() => alert("Withdraw feature not implemented")}>
            Withdraw
          </button>
          <button @click=${() => alert("History feature not implemented")}>
            Withdraw History
          </button>
        </div>

        <div class="task-list">
          <h2>Bind Accounts</h2>
          ${this.tasks.map(
            (task: any) => html`
              <div class="task-item">
                <span>${task.name}</span>
                <button
                  @click=${() =>
                    task.bound
                      ? this.handleUnbind(task)
                      : this.handleBind(task)}
                >
                  ${task.bound ? "Unbind" : "Bind"}
                </button>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}

customElements.define("profile-page", ProfilePage);
