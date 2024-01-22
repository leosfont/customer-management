class TravellingSalesmanSolverHelper {
  constructor(customers) {
    this.customers = customers;
  }

  calculateDistance(point1, point2) {
    return Math.sqrt(Math.pow(point1.coordinate_x - point2.coordinate_x, 2) + Math.pow(point1.coordinate_y - point2.coordinate_y, 2));
  }

  calculateTotalCost(permutation) {
    let totalCost = 0;

    for (let i = 1; i < permutation.length; i++) {
      const startPoint = this.customers[permutation[i - 1]];
      const endPoint = this.customers[permutation[i]];
      totalCost += this.calculateDistance(startPoint, endPoint);
    }

    totalCost += this.calculateDistance(this.customers[permutation[permutation.length - 1]], this.customers[permutation[0]]);
    return totalCost;
  }

  generatePermutations() {
    const n = this.customers.length;
    const result = [];
    const maxPermutations = 10000; // Limite no número de permutações

    function permute(arr, start) {
      if (start === arr.length - 1 || result.length >= maxPermutations) {
        result.push(arr.slice());
        return;
      }

      for (let i = start; i < arr.length; i++) {
        [arr[start], arr[i]] = [arr[i], arr[start]];
        permute(arr, start + 1);
        [arr[start], arr[i]] = [arr[i], arr[start]];
      }
    }

    permute(Array.from({ length: n }, (_, i) => i), 1);
    return result;
  }

  solveTSP() {
    const allPermutations = this.generatePermutations();

    let minCost = Infinity;
    let bestPermutation = [];

    allPermutations.forEach(permutation => {
      const currentCost = this.calculateTotalCost(permutation);
      if (currentCost < minCost) {
        minCost = currentCost;
        bestPermutation = permutation;
      }
    });

    // Remover o ponto de partida (0) do array de retorno
    const filteredCustomers = bestPermutation.filter(index => index !== 0);
    return filteredCustomers.map(index => this.customers[index]);
  }
}

export default TravellingSalesmanSolverHelper;
