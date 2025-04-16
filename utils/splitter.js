function splitAmount(amount, participants) {
    if (!participants.length) throw new Error('No participants provided');
    const perPerson = parseFloat((amount / participants.length).toFixed(2));
    const result = {};
    participants.forEach(p => result[p] = perPerson);
    return result;
  }
  
  module.exports = { splitAmount };
  