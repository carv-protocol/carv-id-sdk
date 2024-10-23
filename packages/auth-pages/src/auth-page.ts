import { LitElement, html, css } from "lit";
// import { customElement, property } from "lit/decorators.js";
//localhost:5173/carv_id.svg
class AuthPage extends LitElement {
  static styles = css`
    .container {
      padding: 20px;
    }
    .authorize-button {
      background-color: #4caf50;
      color: white;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
    }
  `;

  authorize() {
    // 模拟授权流程
    alert("授权成功");
    window.location.hash = "#/profile"; // 跳转到个人中心页面
  }

  render() {
    return html`
      <div class="container">
        <h1>授权 CARV ID</h1>
        <p>请阅读并同意授权条款，然后点击授权按钮。</p>
        <button class="authorize-button" @click=${this.authorize}>授权</button>
      </div>
    `;
  }
}

customElements.define("auth-page", AuthPage);
