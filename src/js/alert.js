export default class Alert {
  constructor() {
    this.alerts = [];
    this.loadAlerts();
  }

  async loadAlerts() {
    try {
      const response = await fetch('/js/alerts.json');
      if (response.ok) {
        this.alerts = await response.json();
      }
    } catch (err) {
      console.error('Failed to load alerts:', err);
    }
  }

  render() {
    if (this.alerts.length === 0) return;

    const alertSection = document.createElement('section');
    alertSection.className = 'alert-list';

    this.alerts.forEach(alert => {
      const alertElement = document.createElement('p');
      alertElement.textContent = alert.message;
      alertElement.style.backgroundColor = alert.background;
      alertElement.style.color = alert.color || 'white';
      alertElement.style.padding = '1rem';
      alertElement.style.margin = '0.5rem 0';
      alertElement.style.borderRadius = '4px';
      alertSection.appendChild(alertElement);
    });

    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.prepend(alertSection);
    }
  }
}
