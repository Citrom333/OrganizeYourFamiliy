using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Model.Entities;

public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    public string Name { get; set; }
    public string Password { get; set; }
    public string FamilyRole { get; set; }
    public DateTime? Birthday { get; set; }
    public List<ToDo> Tasks { get; set; }
    public List<ScheduledProgram> Programs { get; set; }
    public string AvatarPic { get; set; }
    public List<Reward> Rewards { get; set; }
    public Family Family { get; set; }
    public int RewardPointHousework { get; set; }
    public int RewardPointJob{ get; set; }
    public int RewardPointSchool { get; set; }
    public int RewardPointOther { get; set; }
    
}