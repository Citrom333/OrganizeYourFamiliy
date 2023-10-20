using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model.DTOs;

public class RewardDTO
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
    public long Id { get; set; }
    public string Name { get; set; }
    public int Cost { get; set; }
    public long FamilyId { get; set; }
}