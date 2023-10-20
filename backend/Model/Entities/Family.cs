using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model.Entities;

public class Family
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    public string Name { get; set; }
    public string Password { get; set; }

    public List<User> FamilyMembers { get; set; } = new List<User>();
    public List<Reward> Rewards { get; set; } = new List<Reward>();
    public long? LeaderOfFamilyId { get; set; }
    public User? LeaderOfFamily { get; set; }
}